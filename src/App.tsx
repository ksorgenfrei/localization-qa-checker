import { useState } from 'react'
import { analyseSourceFile } from './core/analysis/analyseSourceFile'
import type { QaFinding } from './core/models/qa'
import { parseLocalizationJson } from './core/parsing/parseLocalizationJson'

type AnalysisState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'results'; fileName: string; entryCount: number; findings: QaFinding[] }

function App() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({ status: 'idle' })

  async function handleFileSelection(file: File | undefined) {
    if (!file) {
      return
    }

    let content: string

    try {
      content = await file.text()
    } catch {
      setAnalysisState({
        status: 'error',
        message: 'The selected file could not be read. Please try again.',
      })
      return
    }

    const parsed = parseLocalizationJson(content)

    if (!parsed.success) {
      setAnalysisState({ status: 'error', message: parsed.message })
      return
    }

    setAnalysisState({
      status: 'results',
      fileName: file.name,
      entryCount: Object.keys(parsed.file).length,
      findings: analyseSourceFile(parsed.file),
    })
  }

  return (
    <main className="app-shell">
      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">Localization quality assurance</p>
        <h1 id="page-title">Localization QA Checker</h1>
        <p className="summary">
          Check localization JSON files for structural and content issues before
          they reach your users.
        </p>
      </section>

      <section className="next-step" aria-labelledby="upload-title">
        <h2 id="upload-title">Check an English source file</h2>
        <p>
          Upload a flat JSON file with string IDs and English text values. This
          first check finds entries that are empty or contain only whitespace.
        </p>
        <label className="file-picker" htmlFor="source-file">
          <span>Select an English JSON file</span>
          <input
            id="source-file"
            type="file"
            accept="application/json,.json"
            onChange={(event) => {
              void handleFileSelection(event.target.files?.[0])
              event.target.value = ''
            }}
          />
        </label>
        <p className="sample-note">
          Try <code>public/samples/english-with-empty-strings.json</code> to
          see two findings.
        </p>
      </section>

      {analysisState.status === 'error' && (
        <section className="result-panel result-panel--error" role="alert">
          <h2>File could not be analyzed</h2>
          <p>{analysisState.message}</p>
        </section>
      )}

      {analysisState.status === 'results' && (
        <section className="result-panel" aria-live="polite" aria-labelledby="results-title">
          <h2 id="results-title">Results</h2>
          <p>
            Analyzed <strong>{analysisState.fileName}</strong> with{' '}
            {analysisState.entryCount} entries.
          </p>

          {analysisState.findings.length === 0 ? (
            <p className="success-message">No source QA issues found.</p>
          ) : (
            <ul className="findings-list">
              {analysisState.findings.map((finding) => (
                <li key={`${finding.ruleId}-${finding.stringId ?? finding.scope}`}>
                  <p className="finding-severity">{finding.severity}</p>
                  <p>
                    <code>{finding.scope === 'file' ? 'Entire source file' : finding.stringId}</code>:{' '}
                    {finding.message}
                  </p>
                  {finding.details && (
                    <ul className="finding-details">
                      {finding.details.map((detail) => (
                        <li key={detail.text}>
                          {detail.text}
                          {detail.children && (
                            <ul className="finding-detail-children">
                              {detail.children.map((child) => (
                                <li key={child}>{child}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  )
}

export default App

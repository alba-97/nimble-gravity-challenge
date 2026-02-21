import type { Candidate } from '../interfaces/Candidate'

interface CandidatePanelProps {
  email: string
  onEmailChange: (next: string) => void
  onLoad: () => void
  isLoading: boolean
  error: string | null
  candidate: Candidate | null
  isBaseUrlConfigured: boolean
}

export function CandidatePanel({
  email,
  onEmailChange,
  onLoad,
  isLoading,
  error,
  candidate,
  isBaseUrlConfigured,
}: CandidatePanelProps) {
  return (
    <section className="panel" aria-label="Candidate information">
      <header className="panelHeader">
        <h2 className="panelTitle">Candidate</h2>
        {!isBaseUrlConfigured ? (
          <p className="warningText">Missing VITE_BASE_URL</p>
        ) : null}
      </header>

      <div className="panelBody">
        <div className="inlineForm" role="group" aria-label="Load candidate">
          <label className="field inlineField">
            <span className="fieldLabel">Email</span>
            <input
              aria-label="Candidate email"
              className="textInput"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="your-email@example.com"
              inputMode="email"
              autoComplete="email"
              disabled={isLoading}
            />
          </label>

          <button
            type="button"
            className="secondaryButton"
            aria-label="Load candidate data"
            onClick={onLoad}
            disabled={!isBaseUrlConfigured || isLoading || email.trim().length === 0}
          >
            {isLoading ? 'Loading…' : 'Load'}
          </button>
        </div>

        {error ? <p className="errorText">{error}</p> : null}

        {candidate ? (
          <dl className="definitionList">
            <div className="definitionRow">
              <dt className="definitionTerm">Name</dt>
              <dd className="definitionValue">
                {candidate.firstName} {candidate.lastName}
              </dd>
            </div>
            <div className="definitionRow">
              <dt className="definitionTerm">Email</dt>
              <dd className="definitionValue">{candidate.email}</dd>
            </div>
            <div className="definitionRow">
              <dt className="definitionTerm">UUID</dt>
              <dd className="definitionValue">{candidate.uuid}</dd>
            </div>
            <div className="definitionRow">
              <dt className="definitionTerm">Candidate ID</dt>
              <dd className="definitionValue">{candidate.candidateId}</dd>
            </div>
          </dl>
        ) : null}
      </div>
    </section>
  )
}

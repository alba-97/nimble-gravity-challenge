import type { Job } from '../interfaces/Job'
import type { RepoUrlByJobId } from '../interfaces/RepoUrlByJobId'
import type { SubmitErrorByJobId } from '../interfaces/SubmitErrorByJobId'
import type { BooleanByJobId } from '../interfaces/BooleanByJobId'
import { JobsList } from './JobsList'

interface JobsPanelProps {
  jobs: Job[]
  isLoading: boolean
  error: string | null
  repoUrlByJobId: RepoUrlByJobId
  onRepoUrlChange: (jobId: string, next: string) => void
  onSubmit: (jobId: string) => void
  isSubmittingByJobId: BooleanByJobId
  submitErrorByJobId: SubmitErrorByJobId
  submitOkByJobId: BooleanByJobId
  isSubmitDisabledByJobId: BooleanByJobId
}

export function JobsPanel({
  jobs,
  isLoading,
  error,
  repoUrlByJobId,
  onRepoUrlChange,
  onSubmit,
  isSubmittingByJobId,
  submitErrorByJobId,
  submitOkByJobId,
  isSubmitDisabledByJobId,
}: JobsPanelProps) {
  return (
    <section className="panel" aria-label="Open positions">
      <header className="panelHeader">
        <h2 className="panelTitle">Open positions</h2>
        <p className="panelSubtitle">Pick one and submit your repo URL</p>
      </header>

      <div className="panelBody">
        {isLoading ? <p className="mutedText">Loading jobs…</p> : null}
        {error ? <p className="errorText">{error}</p> : null}

        {!isLoading && !error ? (
          <JobsList
            jobs={jobs}
            repoUrlByJobId={repoUrlByJobId}
            onRepoUrlChange={onRepoUrlChange}
            onSubmit={onSubmit}
            isSubmittingByJobId={isSubmittingByJobId}
            submitErrorByJobId={submitErrorByJobId}
            submitOkByJobId={submitOkByJobId}
            isSubmitDisabledByJobId={isSubmitDisabledByJobId}
          />
        ) : null}
      </div>
    </section>
  )
}

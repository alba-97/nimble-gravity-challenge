import type { Job } from '../interfaces/Job'
import type { RepoUrlByJobId } from '../interfaces/RepoUrlByJobId'
import type { SubmitErrorByJobId } from '../interfaces/SubmitErrorByJobId'
import type { BooleanByJobId } from '../interfaces/BooleanByJobId'
import { JobCard } from './JobCard'

interface JobsListProps {
  jobs: Job[]
  repoUrlByJobId: RepoUrlByJobId
  onRepoUrlChange: (jobId: string, next: string) => void
  onSubmit: (jobId: string) => void
  isSubmittingByJobId: BooleanByJobId
  submitErrorByJobId: SubmitErrorByJobId
  submitOkByJobId: BooleanByJobId
  isSubmitDisabledByJobId: BooleanByJobId
}

export function JobsList({
  jobs,
  repoUrlByJobId,
  onRepoUrlChange,
  onSubmit,
  isSubmittingByJobId,
  submitErrorByJobId,
  submitOkByJobId,
  isSubmitDisabledByJobId,
}: JobsListProps) {
  return (
    <ul className="jobsList">
      {jobs.length > 0 ? jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          repoUrl={repoUrlByJobId[job.id] ?? ''}
          onRepoUrlChange={(next) => onRepoUrlChange(job.id, next)}
          onSubmit={() => onSubmit(job.id)}
          isSubmitting={isSubmittingByJobId[job.id] ?? false}
          submitError={submitErrorByJobId[job.id] ?? null}
          submitOk={submitOkByJobId[job.id] ?? false}
          isDisabled={isSubmitDisabledByJobId[job.id] ?? true}
        />
      )) : <p className="mutedText">Click "Load jobs" to see the list of open positions</p>}
    </ul>
  )
}

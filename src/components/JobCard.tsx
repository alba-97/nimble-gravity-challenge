import type { Job } from '../interfaces/Job'

interface JobCardProps {
  job: Job
  repoUrl: string
  onRepoUrlChange: (next: string) => void
  onSubmit: () => void
  isSubmitting: boolean
  submitError: string | null
  submitOk: boolean
  isDisabled: boolean
}

export function JobCard({
  job,
  repoUrl,
  onRepoUrlChange,
  onSubmit,
  isSubmitting,
  submitError,
  submitOk,
  isDisabled,
}: JobCardProps) {
  return (
    <li className="jobCard">
      <div className="jobCardHeader">
        <h3 className="jobTitle">{job.title}</h3>
        <p className="jobMeta">Job ID: {job.id}</p>
      </div>

      <div className="jobCardBody">
        <label className="field">
          <span className="fieldLabel">GitHub repo URL</span>
          <input
            aria-label={`GitHub repository URL for ${job.title}`}
            className="textInput"
            value={repoUrl}
            onChange={(e) => onRepoUrlChange(e.target.value)}
            placeholder="https://github.com/your-user/your-repo"
            inputMode="url"
            autoComplete="url"
            disabled={isSubmitting}
          />
        </label>

        <div className="actions">
          <button
            type="button"
            className="primaryButton"
            aria-label={`Submit application to ${job.title}`}
            onClick={onSubmit}
            disabled={isDisabled || isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </button>

          {submitOk ? <span className="successText">Submitted</span> : null}
        </div>

        {submitError ? <p className="errorText">{submitError}</p> : null}
      </div>
    </li>
  )
}

import './App.css'
import { useMemo, useState } from 'react'
import type { Candidate } from './interfaces/Candidate'
import type { Job } from './interfaces/Job'
import type { RepoUrlByJobId } from './interfaces/RepoUrlByJobId'
import type { SubmitErrorByJobId } from './interfaces/SubmitErrorByJobId'
import type { BooleanByJobId } from './interfaces/BooleanByJobId'
import { CandidatePanel } from './components/CandidatePanel'
import { JobsPanel } from './components/JobsPanel'
import { isBaseUrlConfigured } from './services/apiClient'
import { applyToJob, getCandidateByEmail } from './services/candidateApi'
import { getJobsList } from './services/jobsApi'
import { isValidUrl } from './utils/isValidUrl'

function App() {
  const [email, setEmail] = useState('')
  const [candidate, setCandidate] = useState<Candidate | null>(null)
  const [candidateLoading, setCandidateLoading] = useState(false)
  const [candidateError, setCandidateError] = useState<string | null>(null)

  const [jobs, setJobs] = useState<Job[]>([])
  const [jobsLoading, setJobsLoading] = useState(false)
  const [jobsError, setJobsError] = useState<string | null>(null)

  const [repoUrlByJobId, setRepoUrlByJobId] = useState<RepoUrlByJobId>({})
  const [isSubmittingByJobId, setIsSubmittingByJobId] =
    useState<BooleanByJobId>({})
  const [submitErrorByJobId, setSubmitErrorByJobId] =
    useState<SubmitErrorByJobId>({})
  const [submitOkByJobId, setSubmitOkByJobId] = useState<BooleanByJobId>({})

  const isSubmitDisabledByJobId = useMemo((): BooleanByJobId => {
    const next: BooleanByJobId = {}

    for (const job of jobs) {
      const repoUrl = (repoUrlByJobId[job.id] ?? '').trim()
      next[job.id] =
        !candidate || !isValidUrl(repoUrl) || isSubmittingByJobId[job.id] === true
    }

    return next
  }, [candidate, isSubmittingByJobId, jobs, repoUrlByJobId])

  async function handleLoadCandidate() {
    if (!isBaseUrlConfigured) {
      setCandidateError('VITE_BASE_URL is not configured')
      return
    }

    const nextEmail = email.trim()
    if (nextEmail.length === 0) {
      setCandidateError('Email is required')
      return
    }

    setCandidateLoading(true)
    setCandidateError(null)
    setCandidate(null)

    try {
      const data = await getCandidateByEmail(nextEmail)
      setCandidate(data)
    } catch {
      setCandidateError('Failed to load candidate')
    } finally {
      setCandidateLoading(false)
    }
  }

  async function handleLoadJobs() {
    if (!isBaseUrlConfigured) {
      setJobsError('VITE_BASE_URL is not configured')
      return
    }

    setJobsLoading(true)
    setJobsError(null)

    try {
      const data = await getJobsList()
      setJobs(data)
    } catch {
      setJobsError('Failed to load jobs')
    } finally {
      setJobsLoading(false)
    }
  }

  async function handleSubmit(jobId: string) {
    if (!candidate) {
      setSubmitErrorByJobId((prev) => ({
        ...prev,
        [jobId]: 'Load candidate first',
      }))
      return
    }

    const repoUrl = (repoUrlByJobId[jobId] ?? '').trim()
    if (!isValidUrl(repoUrl)) {
      setSubmitErrorByJobId((prev) => ({
        ...prev,
        [jobId]: 'Repo URL is not valid',
      }))
      return
    }

    setIsSubmittingByJobId((prev) => ({ ...prev, [jobId]: true }))
    setSubmitErrorByJobId((prev) => ({ ...prev, [jobId]: null }))
    setSubmitOkByJobId((prev) => ({ ...prev, [jobId]: false }))

    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl,
      })
      setSubmitOkByJobId((prev) => ({ ...prev, [jobId]: true }))
    } catch {
      setSubmitErrorByJobId((prev) => ({
        ...prev,
        [jobId]: 'Failed to submit application',
      }))
    } finally {
      setIsSubmittingByJobId((prev) => ({ ...prev, [jobId]: false }))
    }
  }

  return (
    <main className="appShell" aria-label="Nimble gravity challenge">
      <header className="appHeader">
        <h1 className="appTitle">Job Application</h1>
        <div className="headerActions">
          <button
            type="button"
            className="secondaryButton"
            aria-label="Load jobs list"
            onClick={handleLoadJobs}
            disabled={!isBaseUrlConfigured || jobsLoading}
          >
            {jobsLoading ? 'Loading…' : 'Load jobs'}
          </button>
        </div>
      </header>

      <div className="grid">
        <CandidatePanel
          email={email}
          onEmailChange={setEmail}
          onLoad={handleLoadCandidate}
          isLoading={candidateLoading}
          error={candidateError}
          candidate={candidate}
          isBaseUrlConfigured={isBaseUrlConfigured}
        />

        <JobsPanel
          jobs={jobs}
          isLoading={jobsLoading}
          error={jobsError}
          repoUrlByJobId={repoUrlByJobId}
          onRepoUrlChange={(jobId, next) =>
            setRepoUrlByJobId((prev) => ({ ...prev, [jobId]: next }))
          }
          onSubmit={handleSubmit}
          isSubmittingByJobId={isSubmittingByJobId}
          submitErrorByJobId={submitErrorByJobId}
          submitOkByJobId={submitOkByJobId}
          isSubmitDisabledByJobId={isSubmitDisabledByJobId}
        />
      </div>
    </main>
  )
}

export default App

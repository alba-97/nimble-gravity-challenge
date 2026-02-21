import { apiClient } from './apiClient'
import type { Candidate } from '../interfaces/Candidate'
import type { ApplyToJobBody } from '../interfaces/ApplyToJobBody'

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const response = await apiClient.get<Candidate>('/api/candidate/get-by-email', {
    params: { email },
  })
  return response.data
}

export async function applyToJob(body: ApplyToJobBody): Promise<{ ok: true }> {
  const response = await apiClient.post<{ ok: true }>(
    '/api/candidate/apply-to-job',
    body,
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return response.data
}

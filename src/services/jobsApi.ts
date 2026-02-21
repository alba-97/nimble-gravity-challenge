import { apiClient } from './apiClient'
import type { Job } from '../interfaces/Job'

export async function getJobsList(): Promise<Job[]> {
  const response = await apiClient.get<Job[]>('/api/jobs/get-list')
  return response.data
}

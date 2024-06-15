import axios from 'axios'
import type { Organisation } from '@/models/Organisation'

const API_BASE_URL = 'https://data.directory.openbankingbrasil.org.br'

/**
 * Fetches the list of organisations from the participants endpoint.
 * @returns {Promise<Organisation[]>} The list of organisations.
 */
export const fetchOrganisations = async (): Promise<Organisation[]> => {
  try {
    const response = await axios.get<Organisation[]>(`${API_BASE_URL}/participants`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch organisations', error)
    throw new Error('Failed to fetch organisations')
  }
}

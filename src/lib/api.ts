import { Section, QuestionnaireResponse } from '@/types/questionnaire';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export const api = {
  async getSection(
    questionnaireId: string,
    sectionIndex: number,
    responses: QuestionnaireResponse
  ): Promise<Section> {
    const response = await fetch(
      `${API_BASE_URL}/questionnaires/${questionnaireId}/section/${sectionIndex}?` +
      `responses=${encodeURIComponent(JSON.stringify(responses))}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch section');
    }

    return response.json();
  },

  async submitResponses(
    questionnaireId: string,
    responses: QuestionnaireResponse
  ): Promise<{ responseId: string }> {
    const response = await fetch(
      `${API_BASE_URL}/questionnaires/${questionnaireId}/responses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responses),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to submit responses');
    }

    return response.json();
  },
};
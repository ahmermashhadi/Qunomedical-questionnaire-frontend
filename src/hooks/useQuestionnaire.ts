import { useState, useCallback } from 'react';
import { Section, Question } from '@/types/questionnaire';
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface UseQuestionnaireProps {
  questionnaireId: string;
}

export const useQuestionnaire = ({ questionnaireId }: UseQuestionnaireProps) => {
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSection = useCallback(async (sectionIndex: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/questionnaires/${questionnaireId}/section/${sectionIndex}?` +
        `responses=${encodeURIComponent(JSON.stringify(responses))}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch section');
      
      const section = await response.json();
      section.totalSections = section.questions.length;      
      setCurrentSection(section);
      setCurrentSectionIndex(sectionIndex);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [questionnaireId]);

  const fetchSample = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/questionnaires/${questionnaireId}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch sample');
      
      const section = await response.json();
      setCurrentSection(section.sections[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [questionnaireId]);

  const updateResponse = (question: Question, questionId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    console.log(responses);
  };

  const submitResponses = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/questionnaires/${questionnaireId}/responses`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(responses)
        }

      );
      
      if (!response.ok) throw new Error('Failed to submit responses');
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    currentSection,
    currentSectionIndex,
    responses,
    loading,
    error,
    fetchSection,
    fetchSample,
    updateResponse,
    submitResponses

  };
};
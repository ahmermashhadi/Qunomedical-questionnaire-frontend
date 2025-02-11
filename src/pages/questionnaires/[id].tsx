import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import { QuestionRenderer } from '@/components/QuestionRenderer';
import { ProgressBar } from '@/components/ProgressBar';

export default function QuestionnairePage() {
  const router = useRouter();
  const { id: questionnaireId } = router.query;

  const {
    currentSection,
    currentSectionIndex,
    responses,
    loading,
    error,
    fetchSection,
    fetchSample,
    updateResponse,
    submitResponses

  } = useQuestionnaire({
    questionnaireId: questionnaireId as string
  });

  console.log(currentSectionIndex);
  
  useEffect(() => {
    if (questionnaireId) {
        if(questionnaireId === 'sample-questionnaire') {
            fetchSample();
        } else {
            fetchSection(0);
        }
    }
  }, [questionnaireId, fetchSection]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>
      </div>
    );
  }

  if (!currentSection) return null;

  const handleNext = async () => {
    if (currentSectionIndex < currentSection.totalSections - 1) {
      await fetchSection(currentSectionIndex + 1);
    } else {
      try {
        await submitResponses();
        router.push('/questionnaires/thank-you');
      } catch (err) {
        // Error handling is done in the hook
      }
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      fetchSection(currentSectionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
          <ProgressBar
            currentSection={currentSectionIndex}
            totalSections={currentSection.totalSections}
          />

          <h2 className="text-2xl font-bold text-gray-900">
            {currentSection.title}
          </h2>

          <div className="space-y-8">
            {currentSection.questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {question.text}
                  {question.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                <QuestionRenderer
                  question={question}
                  value={responses[question.id] || ''}
                  onChange={(value) => updateResponse(question, question.id, value)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2"
            >
              {currentSectionIndex === currentSection.totalSections - 1
                ? 'Submit'
                : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
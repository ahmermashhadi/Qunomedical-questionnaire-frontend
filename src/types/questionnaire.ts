export type QuestionType = 'text' | 'radio' | 'multiselect' | 'info';

export interface QuestionDependency {
  questionId: string;
  value: string | string[];
}

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
  question: string;
  required?: boolean;
  dependsOn?: QuestionDependency;
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'radio' | 'multiselect';
  options: string[];
}

export interface InfoQuestion extends BaseQuestion {
  type: 'info';
}

export type Question = TextQuestion | ChoiceQuestion | InfoQuestion;

export interface Section {
  id: string;
  title: string;
  questions: Question[];
  totalSections: number;
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  sections: Section[];
}

// Response types
export type QuestionResponse = string | string[];

export interface QuestionnaireResponse {
  [questionId: string]: QuestionResponse;
}

export interface SubmittedResponse {
  responseId: string;
  questionnaireId: string;
  responses: QuestionnaireResponse;
  timestamp: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// API response types
export interface GetSectionResponse extends ApiResponse<Section> {}

export interface SubmitResponseResponse extends ApiResponse<{
  responseId: string;
}> {}
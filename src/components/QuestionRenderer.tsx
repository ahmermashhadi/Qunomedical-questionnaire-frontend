

import { Question } from '@/types/questionnaire';

interface QuestionRendererProps {
    question: Question;
    value: string | string[];
    onChange: (value: string | string[]) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
    question,
    value,
    onChange
}) => {
    switch (question.type) {
        case 'text':
            return (
                <input
                    id={question.id}
                    key={question.id}
                    name={question.id}
                    type="text"
                    value={value as string || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-500"
                    required={question.required}
                />
            );

        case 'radio':
            return (
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                            <input
                                id={option.toLowerCase()}
                                key={option.toLowerCase()}
                                name={option.toLowerCase()}
                                type="radio"
                                value={option}
                                checked={value === option}
                                onChange={(e) => onChange(e.target.value)}
                                className="focus:ring-2 focus:ring-blue-500"
                                required={question.required}
                            />
                            <span className='text-gray-500'>{option}</span>
                        </label>
                    ))}
                </div>
            );

        case 'multiselect':
            return (
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <label key={option} className="flex items-center space-x-2">
                            <input
                                id={option.toLowerCase()}
                                key={option.toLowerCase()}
                                name={option.toLowerCase()}
                                type="checkbox"
                                value={option}
                                checked={Array.isArray(value) && value.includes(option)}
                                onChange={(e) => {
                                    const currentValue = Array.isArray(value) ? value : [];
                                    const newValue = e.target.checked
                                        ? [...currentValue, option]
                                        : currentValue.filter(v => v !== option);
                                    onChange(newValue);
                                }}
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                            <span className='text-gray-500'>{option}</span>
                        </label>
                    ))}
                </div>
            );

        case 'info':
            return <div className="text-gray-700">{question.question}</div>;

        default:
            return null;
    }
};
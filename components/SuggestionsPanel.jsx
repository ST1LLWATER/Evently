import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useGetSuggestions } from '../reactQuery/hooks';

function SuggestionsPanel({ id }) {
  const queryClient = useQueryClient();
  const [suggestion, setSuggestion] = useState('');
  const { data, status } = useGetSuggestions({ id });

  const postSuggestion = async () => {
    await fetch('/api/event/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: id,
        suggestion: suggestion,
      }),
    }).then((res) => res.json());

    setSuggestion('');
  };

  // Mutations
  const mutation = useMutation(postSuggestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('suggestions');
    },
  });

  return (
    <div className="flex flex-col gap-x-4 flex-1 h-3/5 mt-4 lg:w-2/3 w-full p-4 shadow-sm bg-gray-50 rounded-lg justify-end">
      <div className="overflow-y-auto flex flex-col-reverse">
        {data &&
          data.Suggestions.slice(0)
            .reverse()
            .map((suggestion, index) => {
              let [Screator, Screator_rollno] = suggestion.creator.split(':');
              return (
                <div key={index} className="border-t-2 py-2 px-1">
                  <div className="text-gray-600 text-sm">{`${Screator} - ${Screator_rollno}`}</div>
                  <div className="text-md font-light font-Rubik">
                    {suggestion.suggestion}
                  </div>
                </div>
              );
            })}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="flex gap-x-4 justify-center items-center"
        >
          <div className="w-full">
            <input
              type="text"
              id="text"
              name="text"
              value={suggestion}
              placeholder="Enter You Suggestion"
              autoComplete="off"
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-rose-700 focus:ring-2 focus:ring-rose-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-rose-700 border-0 px-2 py-2 md:px-8 focus:outline-none hover:bg-rose-600 rounded text-md md:text-lg"
          >
            Suggest
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuggestionsPanel;

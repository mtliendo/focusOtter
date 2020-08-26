import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import { updateActivityDay } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import 'quill/dist/quill.snow.css';
import { Button, Divider } from 'antd';

const MyEditor = ({ journalData, onJournalDataUpdate }) => {
  const { quill, quillRef } = useQuill({
    placeholder: "How did the day go? What could've gone better?",
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],

        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],

        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],

        ['clean'],
      ],
      clipboard: {
        matchVisual: false,
      },
    },
  });

  useEffect(() => {
    quill && quill.setContents(JSON.parse(journalData));
  }, [journalData, quill]);

  return (
    <main
      style={{
        height: '50vh',
      }}
    >
      <div ref={quillRef} />
      <Divider>
        <Button
          type="primary"
          onClick={() => {
            onJournalDataUpdate(JSON.stringify(quill.getContents()));
          }}
        >
          Save
        </Button>
      </Divider>
    </main>
  );
};

function Journal({ location }) {
  const { currentDayID, displayDate, journalData = '{}' } = location.state;
  console.log({ journalData });
  const handleJournalDataUpdate = newJournalData => {
    API.graphql(
      graphqlOperation(updateActivityDay, {
        input: { id: currentDayID, journalEntry: newJournalData },
      })
    );
  };
  return (
    <main>
      <section>
        <h2 style={{ textAlign: 'center' }}>{displayDate}</h2>
      </section>
      <MyEditor
        journalData={journalData}
        onJournalDataUpdate={handleJournalDataUpdate}
      />
    </main>
  );
}

export default Journal;

import React from 'react';
import Page from 'app/components/Page/Page';
import ProgramForm from './ProgramForm';


function CreateProgramPage (props) {
  return (
    <Page title='Create Program'>
      <ProgramForm/>
    </Page>
  );
};

export default CreateProgramPage;

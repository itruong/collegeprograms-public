import React from 'react';
import Page from 'app/components/Page/Page';
import SavedProgramsContainer from './SavedProgramsContainer';


export default function SavedProgramsPage (props) {
  return (
    <Page title='My Programs'>
      <SavedProgramsContainer/>
    </Page>
  );
};

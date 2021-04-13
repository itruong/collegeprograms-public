import React from 'react';
import Page from 'app/components/Page/Page';
import AllProgramsContainer from './AllProgramsContainer';


export default function AllProgramsPage (props) {
  return (
    <Page>
      <AllProgramsContainer {...props}/>
    </Page>
  );
};

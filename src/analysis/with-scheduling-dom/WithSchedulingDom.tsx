import React, { FunctionComponent, ReactElement } from 'react';

import EventBox from './EventBox';

/**
 * With scheduling, using DOM
 */
const WithSchedulingDom: FunctionComponent = (): ReactElement => {
  return (
    <>
      <h2>With scheduling, using DOM</h2>
      <ul>
        {[...Array(1000)].map((value, index) => {
          return (
            <li key={index}>
              <EventBox id={index} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WithSchedulingDom;

import React, { FunctionComponent, ReactElement } from 'react';
import EventBox from './EventBox';

/**
 * Without scheduling, using DOM
 */
const WithoutSchedulingDom: FunctionComponent = (): ReactElement => {
  return (
    <>
      <h2>Without scheduling, using DOM</h2>
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

export default WithoutSchedulingDom;

import React, { ReactElement, FunctionComponent, useState, useCallback } from 'react';

import { Switch, Route, BrowserRouter as Router, NavLink } from 'react-router-dom';

import { EventsProvider } from './shared/events/EventsContext';
import AnalysisPage from './analysis/AnalysisPage';
import { RenderSchedulerProvider } from './shared/render-scheduler/RenderSchedulerContext';
import EventBoxWithoutSchedulingUsingReact from './analysis/EventBoxWithoutSchedulingUsingReact';
import ProfilerLineChart from './profiler/ProfilerLineChart';
import ProfilerFlameChart from './profiler/ProfilerFlameChart';
import ProfilerStatistics from './profiler/ProfilerStatistics';

/**
 * App
 */
const App: FunctionComponent = (): ReactElement => {
  const [eventsWithoutSchedulingUsingReactProfilerResults, setEventsWithoutSchedulingUsingReactProfilerResults] = useState<Array<any>>([]);

  const complete = useCallback(
    (profilerResults: Array<any>) => {
      // console.log(profilerResults);
      setEventsWithoutSchedulingUsingReactProfilerResults(profilerResults);
    },
    [setEventsWithoutSchedulingUsingReactProfilerResults],
  );

  return (
    <EventsProvider>
      <RenderSchedulerProvider>
        <Router>
          <div style={{ margin: '32px' }}>
            <header style={{ padding: '16px 12px', backgroundColor: '#333' }}>
              <h1 style={{ marginTop: '0', marginBottom: '0', fontSize: '24px', color: '#FFF' }}>React Scheduling Experiment</h1>
            </header>
            <nav style={{ backgroundColor: '#EEE', padding: '12px' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '0', marginBottom: '0', display: 'flex' }}>
                <li style={{ marginRight: '24px' }}>
                  <NavLink to="/events-without-scheduling-using-react">Without scheduling, using React</NavLink>
                </li>
                <li style={{ marginRight: '24px' }}>
                  <NavLink to="/events-with-scheduling-using-react">With scheduling, using React</NavLink>
                </li>
                {/* <li style={{ marginRight: '24px' }}>
                  <NavLink to="/with-scheduling-dom">With scheduling, using DOM</NavLink>
                </li>
                <li>
                  <NavLink to="/without-scheduling-dom">Without scheduling, using DOM</NavLink>
                </li> */}
              </ul>
            </nav>
            {eventsWithoutSchedulingUsingReactProfilerResults.length > 0 && (
              <>
                <div style={{ width: 1500, height: 200 }}>
                  <ProfilerLineChart profilerResults={eventsWithoutSchedulingUsingReactProfilerResults} />
                </div>
                <ProfilerFlameChart profilerResults={eventsWithoutSchedulingUsingReactProfilerResults} />
                <ProfilerStatistics profilerResults={eventsWithoutSchedulingUsingReactProfilerResults} />
              </>
            )}
            <main style={{ marginTop: '48px' }}>
              <Switch>
                {/* Events, without scheduling, using React */}
                <Route
                  path="/events-without-scheduling-using-react"
                  render={() => {
                    return (
                      <AnalysisPage
                        id="events-without-scheduling-using-react"
                        title="Without scheduling, using React"
                        render={(eventId: number) => {
                          return <EventBoxWithoutSchedulingUsingReact eventId={eventId} />;
                        }}
                        complete={complete}
                      />
                    );
                  }}
                />

                {/* Events, with scheduling, using React */}
                {/* <Route
                  path="/events-with-scheduling-using-react"
                  render={() => {
                    return (
                      <AnalysisPage
                        id="events-with-scheduling-using-react"
                        title="With scheduling, using React"
                        render={(eventId: number) => {
                          return <EventBoxWithSchedulingUsingReact eventId={eventId} />;
                        }}
                        complete={(profilerResults: Array<any>) => {
                          eventsWithSchedulingUsingReactProfilerResults.current = profilerResults;
                          console.info(eventsWithSchedulingUsingReactProfilerResults.current);
                        }}
                      />
                    );
                  }}
                /> */}

                {/* <Route path="/with-scheduling-dom" component={WithSchedulingDom} /> */}

                {/* <Route path="/without-scheduling-dom" component={WithoutSchedulingDom} /> */}
              </Switch>
            </main>
          </div>
        </Router>
      </RenderSchedulerProvider>
    </EventsProvider>
  );
};

export default App;

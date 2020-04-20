import React, { ReactElement, FunctionComponent, useRef, useState, useCallback } from 'react';

import { Switch, Route, BrowserRouter as Router, NavLink } from 'react-router-dom';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, AreaChart, Area, ReferenceLine, BarChart, Bar } from 'recharts';
import { FlameGraph } from 'react-flame-graph';

import { EventsProvider } from './shared/events/EventsContext';
import AnalysisPage from './analysis/AnalysisPage';
import EventBoxWithSchedulingUsingReact from './analysis/EventBoxWithSchedulingUsingReact';
import { RenderSchedulerProvider } from './shared/render-scheduler/RenderSchedulerContext';
import EventBoxWithoutSchedulingUsingReact from './analysis/EventBoxWithoutSchedulingUsingReact';

const SimpleLineChart = ({ data, average }: any) => {
  return (
    <>
      <p>Renders: {data.length}</p>
      <p>Average: {average}</p>
      <AreaChart width={1500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </>
  );
};

const Timeline = ({ data }: any) => {
  return (
    <FlameGraph
      data={data}
      height={300}
      width={1500}
      // onChange={(node) => {
      //   console.log(`"${node.name}" focused`);
      // }}
    />
  );
};

const convertToTimeline = (data: any) => {
  return data.map((item: any, index: 0) => {
    return {
      name: index,
      value: Math.round(item.data.actualDuration * 100) / 100,
      tooltip: Math.round(item.data.actualDuration * 100) / 100,
      // name: item.timestamp,
      // x: index,
      // y: Math.round(item.data.actualDuration * 100) / 100,
    };
  });
};

const convert = (data: any) => {
  return data.map((item: any, index: 0) => {
    return {
      name: item.timestamp,
      x: index,
      y: Math.round(item.data.actualDuration * 100) / 100,
    };
  });
};

const timelineSum = (data: any) => {
  return data.reduce((a: any, b: any) => {
    return a + b.data.actualDuration;
  }, 0);
};

/**
 * App
 */
const App: FunctionComponent = (): ReactElement => {
  const [eventsWithoutSchedulingUsingReactProfilerResults, setEventsWithoutSchedulingUsingReactProfilerResults] = useState<Array<any>>([]);
  const [timeEvents, setTimeEvents] = useState<Array<any>>([]);
  const [average, setAverage] = useState(0);
  const [sum, setSum] = useState(0);
  // const [eventsWithSchedulingUsingReactProfilerResults] = useState<Array<any>>([]);

  const complete = useCallback(
    (profilerResults: Array<any>) => {
      console.log(profilerResults);
      setEventsWithoutSchedulingUsingReactProfilerResults(convert(profilerResults));
      setSum(timelineSum(profilerResults));
      setTimeEvents(convertToTimeline(profilerResults));
      // const avg =
      //   profilerResults.reduce((a, b) => {
      //     return a + b.data.actualDuration;
      //   }, 0) / profilerResults.length;
      // setAverage(avg);
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
            <SimpleLineChart data={eventsWithoutSchedulingUsingReactProfilerResults} average={average} />
            {timeEvents.length > 0 && <Timeline data={{ name: 'root', value: sum, children: timeEvents }} />}
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

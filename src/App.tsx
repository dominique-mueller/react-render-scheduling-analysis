import React, { ReactElement, FunctionComponent } from 'react';

import { Switch, Route, BrowserRouter as Router, NavLink } from 'react-router-dom';

import { EventProvider } from './shared/EventContext';
import WithoutSchedulingReact from './pages/without-scheduling-react/WithoutSchedulingReact';
import WithoutSchedulingDom from './pages/without-scheduling-dom/WithoutSchedulingDom';
import WithSchedulingReact from './pages/with-scheduling-react/WithSchedulingReact';
import { RenderSchedulerProvider } from './shared/RenderSchedulerContext';
import WithSchedulingDom from './pages/with-scheduling-dom/WithSchedulingDom';

/**
 * App
 */
const App: FunctionComponent = (): ReactElement => {
  return (
    <EventProvider>
      <RenderSchedulerProvider>
        <Router>
          <div style={{ margin: '32px' }}>
            <header style={{ padding: '16px 12px', backgroundColor: '#333' }}>
              <h1 style={{ marginTop: '0', marginBottom: '0', fontSize: '24px', color: '#FFF' }}>React Scheduling Experiment</h1>
            </header>

            <nav style={{ backgroundColor: '#EEE', padding: '12px' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '0', marginBottom: '0', display: 'flex' }}>
                <li style={{ marginRight: '24px' }}>
                  <NavLink to="/with-scheduling-react">With scheduling, using React</NavLink>
                </li>
                <li style={{ marginRight: '24px' }}>
                  <NavLink to="/with-scheduling-dom">With scheduling, using DOM</NavLink>
                </li>
                <li style={{ marginRight: '24px' }}>
                  <NavLink to="/without-scheduling-react">Without scheduling, using React</NavLink>
                </li>
                <li>
                  <NavLink to="/without-scheduling-dom">Without scheduling, using DOM</NavLink>
                </li>
              </ul>
            </nav>

            <main style={{ marginTop: '48px' }}>
              <Switch>
                <Route path="/with-scheduling-react" component={WithSchedulingReact} />
                <Route path="/with-scheduling-dom" component={WithSchedulingDom} />
                <Route path="/without-scheduling-react" component={WithoutSchedulingReact} />
                <Route path="/without-scheduling-dom" component={WithoutSchedulingDom} />
              </Switch>
            </main>
          </div>
        </Router>
      </RenderSchedulerProvider>
    </EventProvider>
  );
};

export default App;

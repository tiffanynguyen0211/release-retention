import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReleaseRetension } from '../.';

import releaseData from './staticData/Releases.json';
import projectData from './staticData/Projects.json';
import deploymentData from './staticData/Deployments.json';
import environmentData from './staticData/Environments.json';

const App = () => {
    return (
        <div>
            <ReleaseRetension
                projects={projectData}
                releases={releaseData}
                deployments={deploymentData}
                environments={environmentData}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

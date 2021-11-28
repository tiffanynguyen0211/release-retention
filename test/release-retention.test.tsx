import * as React from 'react';
import axe from 'axe-core';
import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ReactElement } from 'react';

import releaseData from '../staticData/Releases.json';
import projectData from '../staticData/Projects.json';
import deploymentData from '../staticData/Deployments.json';
import environmentData from '../staticData/Environments.json';

import { ReleaseRetension } from '../src';
import { mountToDoc } from '../.jest/jest-setup';
import { Deployment, Environment, Project, Release } from '../src/types';

const setup = (
    render: (x: ReactElement) => ReactWrapper | ShallowWrapper,
    props: JSX.IntrinsicAttributes,
) => {
    const defaultProps: {
        projects?: Project[];
        releases?: Release[];
        environments?: Environment[];
        deployments?: Deployment[];
    } = {
        projects: projectData,
        releases: releaseData,
        environments: environmentData,
        deployments: deploymentData,
    };

    const component = render(<ReleaseRetension {...defaultProps} {...props} />);

    return {
        actual: component,
    };
};

describe('Release Retention', () => {
    it('should match snapshot on first render', () => {
        const { actual } = setup(mount, {});
        actual.update();
        expect(toJson(actual)).toMatchSnapshot();
    });

    it('has no accessibility violations', () => {
        const { actual } = setup(mountToDoc, {});
        const componentNode = actual.getDOMNode();

        axe.run(componentNode, (err, { violations }) => {
            expect(err).toBe(null);
            expect(violations).toHaveLength(0);
        });
    });
});

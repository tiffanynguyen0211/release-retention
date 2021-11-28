import * as React from 'react';
import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ReactElement } from 'react';

// import { ProjectSummary } from '../src/project-summary';
import { Deployment, Environment, Project, Release } from '../src/types';
import { ProjectContainer } from '../src/project-container';

const mock2Releases1Env = {
    deployments: [
        {
            Id: 'Deployment-2',
            ReleaseId: 'Release-1',
            EnvironmentId: 'Environment-1',
            DeployedAt: '2000-01-01T11:00:00',
        },
        {
            Id: 'Deployment-1',
            ReleaseId: 'Release-2',
            EnvironmentId: 'Environment-1',
            DeployedAt: '2000-01-01T10:00:00',
        },
    ],
    releases: [
        {
            Id: 'Release-1',
            ProjectId: 'Project-1',
            Version: '1.0.0',
            Created: '2000-01-01T08:00:00',
        },
        {
            Id: 'Release-2',
            ProjectId: 'Project-1',
            Version: '1.0.1',
            Created: '2000-01-01T09:00:00',
        },
    ],
};

const mock2Release2Env = {
    deployments: [
        {
            Id: 'Deployment-1',
            ReleaseId: 'Release-2',
            EnvironmentId: 'Environment-1',
            DeployedAt: '2000-01-01T11:00:00',
        },
        {
            Id: 'Deployment-2',
            ReleaseId: 'Release-1',
            EnvironmentId: 'Environment-2',
            DeployedAt: '2000-01-02T11:00:00',
        },
    ],
    releases: [
        {
            Id: 'Release-1',
            ProjectId: 'Project-1',
            Version: '1.0.0',
            Created: '2000-01-01T08:00:00',
        },
        {
            Id: 'Release-2',
            ProjectId: 'Project-1',
            Version: '1.0.1',
            Created: '2000-01-01T09:00:00',
        },
    ],
    environments: [
        {
            Id: 'Environment-1',
            Name: 'Staging',
        },
        {
            Id: 'Environment-2',
            Name: 'Production}',
        },
    ],
};

const setup = (
    render: (x: ReactElement) => ReactWrapper | ShallowWrapper,
    props: JSX.IntrinsicAttributes,
) => {
    const defaultProps: {
        project: Project;
        releases: Release[];
        environments: Environment[];
        deployments: Deployment[];
    } = {
        project: {
            Id: 'Project-1',
            Name: 'Random Quotes',
        },
        releases: [
            {
                Id: 'Release-1',
                ProjectId: 'Project-1',
                Version: '1.0.0',
                Created: '2000-01-01T08:00:00',
            },
        ],
        environments: [
            {
                Id: 'Environment-1',
                Name: 'Staging',
            },
        ],
        deployments: [
            {
                Id: 'Deployment-1',
                ReleaseId: 'Release-1',
                EnvironmentId: 'Environment-1',
                DeployedAt: '2000-01-01T10:00:00',
            },
        ],
    };

    const component = render(<ProjectContainer {...defaultProps} {...props} />);

    return {
        actual: component,
    };
};

describe('Project Summary', () => {
    it('should keep Release-1 in case 1 Release 1 Env', () => {
        const { actual } = setup(mount, {});
        const resultTable = actual.find('tbody');
        const resultRow = resultTable.find('tr');
        expect(resultRow).toHaveLength(1);
        const firstRowColumns = resultRow
            .first()
            .find('td')
            .map((column: { text: () => any }) => column.text());
        expect(firstRowColumns[0]).toBe(
            'Release-1 (Version:1.0.0, Created:2000-01-01T08:00:00)',
        );
        expect(firstRowColumns[1]).toBe('Environment-1');
        expect(toJson(actual)).toMatchSnapshot();
    });

    it('should keep Release-1 in case 2 Releases in 1 Env', () => {
        const { actual } = setup(mount, {});
        actual.setProps(mock2Releases1Env);
        actual.update();
        const resultTable = actual.find('tbody');
        const resultRow = resultTable.find('tr');
        expect(resultRow).toHaveLength(1);
        const firstRowColumns = resultRow
            .first()
            .find('td')
            .map((column: { text: () => any }) => column.text());
        expect(firstRowColumns[0]).toBe(
            'Release-1 (Version:1.0.0, Created:2000-01-01T08:00:00)',
        );
        expect(firstRowColumns[1]).toBe('Environment-1');
        expect(toJson(actual)).toMatchSnapshot();
    });

    it('should keep Release-1 and Release-2 in case 2 Releases to 2 Envs', () => {
        const { actual } = setup(mount, {});
        actual.setProps(mock2Release2Env);
        actual.update();
        const resultTable = actual.find('tbody');
        const resultRow = resultTable.find('tr');
        expect(resultRow).toHaveLength(2);
        const firstRowColumns = resultRow
            .first()
            .find('td')
            .map((column: { text: () => any }) => column.text());
        expect(firstRowColumns[0]).toBe(
            'Release-2 (Version:1.0.1, Created:2000-01-01T09:00:00)',
        );

        const secondRowColumns = resultRow
            .last()
            .find('td')
            .map((column: { text: () => any }) => column.text());
        expect(secondRowColumns[0]).toBe(
            'Release-1 (Version:1.0.0, Created:2000-01-01T08:00:00)',
        );
        expect(secondRowColumns[1]).toBe('Environment-2');
        expect(toJson(actual)).toMatchSnapshot();
    });
});

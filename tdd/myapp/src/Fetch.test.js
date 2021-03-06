import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import Fetch from './Fetch';

afterEach(cleanup);

it("fetches and displays data", async () => {
    axiosMock.get.mockResolvedValueOnce({data:{greeting:'hello there'}});
    const url = '/greeting';
    const {getByTestId} = render(<Fetch url={url}/>);
    expect(getByTestId('loading')).toHaveTextContent('Loading data');
    const resolvedDiv = await waitForElement(() => getByTestId('resolved'));
    expect(resolvedDiv).toHaveTextContent('hello there');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
});
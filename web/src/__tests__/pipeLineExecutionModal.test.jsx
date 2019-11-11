import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExecutePipeLineModal from '../components/execute-pipeline-modal/executePipeLineModal';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = mount(
  <ExecutePipeLineModal isShowing toggle={() => { }} amountFilesSelected={3} />,
);

test('There should be three buttons', () => {
  const buttonsArr = wrapper.find('button');
  expect(buttonsArr).toHaveLength(3);
});

test('The machines list should be displayed when dropdown button is clicked', () => {
  wrapper.find('#show-first-opt').simulate('click');
  wrapper.find('button.arrow-button').simulate('click');
  expect(wrapper.find('#machines-list')).toHaveLength(1);
});
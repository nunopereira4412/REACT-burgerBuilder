import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe("<BurgerBuilder/>", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder storeIngredients={() => {}} setRedirectPath={() => {}}/>)
    });

    it("should render 1 <BuildControls/> element if \"ingredients\" prop is not null", () => {
        wrapper.setProps({ingredients: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
import React from 'react';
import styled from 'styled-components';
import { StepperStep, StepperSteps } from './StepperSteps';
import {
    StyledStepperHeader,
    StyledStepperHeaderItem
} from './StyledStepperHeader';
import { useStepper } from './context/index';

const Stepper = ({ children }) => {
    const {
        currentStep,
        steps
    } = useStepper();
    return (
        <div className='StyledStepperContainer'>
            <StyledStepperHeader>
                {steps.length ?
                    steps.map((step, index) => (
                        <StyledStepperHeaderItem
                            key={step.id}
                            className={currentStep >= index ? 'completed' : ''}
                        >
                            <div className="step-name" sx={{ textAlign: 'center' }}>{step.name}</div>
                        </StyledStepperHeaderItem>
                    )) : null}
            </StyledStepperHeader>
            <div className='StyledStepperBody'>
                {children}
            </div>
        </div>)
};

Stepper.Step = StepperStep;
Stepper.Steps = StepperSteps;

export default Stepper;

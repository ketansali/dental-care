import styled from 'styled-components';

export const StyledStepperHeaderItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    .step-counter {
        position: relative;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        padding: 10px;
        border-radius: 50%;
        background: #DDF2FF;
        margin-bottom: 6px;
    }

    &::after {
        position: absolute;
        content: '';
        border-bottom: 4px solid #DDF2FF;
        width: 100%;
        top: 35px;
        left: 50%;
        z-index: 2;
    }

    &.completed {
        .step-counter {
            background-color: #4bb543;
        }
        &::before {
            position: absolute;
            content: '';
            border-bottom: 4px solid #004574;
            width: 100%;
            top: 35px;
            left: -50%;
            z-index: 3;
        }
    }

    &:first-child {
        &::before {
            content: none;
        }
    }

    &:last-child {
        &::after {
            content: none;
        }
    }

    @media (max-width: 1024px) {
        font-size: 12px;

        &::after {
            padding-top: 20px;
        }


        &.completed {
            .step-counter {
                background-color: #4bb543;
            }
            &::before {
                padding-top: 20px;
            }
        }
    }
    @media (max-width: 425px) {
        &::after {
            padding-top: 10px;
        }

        &.completed {
            .step-counter {
                background-color: #4bb543;
            }
            &::before {
                padding-top: 10px;
            }
        }
    }
    @media (max-width: 375px) {
        &::after {
            padding-top: 25px;
        }

        &.completed {
            .step-counter {
                background-color: #4bb543;
            }
            &::before {
                padding-top: 25px;
            }
        }
    }
`;

export const StyledStepperHeader = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

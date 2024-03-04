import { createTypedHooks } from 'easy-peasy';
import { DashboardModel } from '.';

const typedHooks = createTypedHooks<DashboardModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
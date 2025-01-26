import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const withNoSSR = (Component: ComponentType) => dynamic(() => Promise.resolve(Component), { ssr: false });

export default withNoSSR;
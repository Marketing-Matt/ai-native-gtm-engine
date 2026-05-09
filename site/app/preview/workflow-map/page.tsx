import type { Metadata } from 'next';
import { WorkflowMap } from '@/components/WorkflowMap';

export const metadata: Metadata = {
  title: 'WorkflowMap preview — gtmstack.ai',
  description:
    'Internal preview of the WorkflowMap React component. Not linked from anywhere public.',
  robots: { index: false, follow: false },
};

export default function WorkflowMapPreviewPage() {
  return <WorkflowMap />;
}

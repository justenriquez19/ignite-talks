import SlideShell from '../../ui/SlideShell';
import Slide01Title from './Slide01Title';
import Slide02WhoAmI from './Slide02WhoAmI';
import Slide03Question from './Slide03Question';
import Slide04Timeline from './Slide04Timeline';
import Slide05ThreePillars from './Slide05ThreePillars';
import Slide06Predict from './Slide06Predict';
import Slide07Vision from './Slide07Vision';
import Slide08Agents from './Slide08Agents';
import Slide09MCP from './Slide09MCP';
import Slide10Stats from './Slide10Stats';
import Slide11VibeCoding from './Slide11VibeCoding';
import Slide12MexicoMap from './Slide12MexicoMap';
import Slide13Paradox from './Slide13Paradox';
import Slide14Relevia from './Slide14Relevia';
import Slide15SkillTree from './Slide15SkillTree';
import Slide16NewJobs from './Slide16NewJobs';
import Slide17Stack from './Slide17Stack';
import Slide18Demo from './Slide18Demo';
import Slide19Opportunity from './Slide19Opportunity';
import Slide20Actions from './Slide20Actions';
import Slide21Closing from './Slide21Closing';
import './talk-slides.css';
import type { ReactNode } from 'react';

const TOTAL_SLIDES = 21;

/** Builds the slide array — each receives isActive from SlideShell */
function buildSlides(): ReactNode[] {
  return [
    <Slide01Title key={1} />,
    <Slide02WhoAmI key={2} />,
    <Slide03Question key={3} />,
    <Slide04Timeline key={4} />,
    <Slide05ThreePillars key={5} />,
    <Slide06Predict key={6} />,
    <Slide07Vision key={7} />,
    <Slide08Agents key={8} />,
    <Slide09MCP key={9} />,
    <Slide10Stats key={10} />,
    <Slide11VibeCoding key={11} />,
    <Slide12MexicoMap key={12} />,
    <Slide13Paradox key={13} />,
    <Slide14Relevia key={14} />,
    <Slide15SkillTree key={15} />,
    <Slide16NewJobs key={16} />,
    <Slide17Stack key={17} />,
    <Slide18Demo key={18} />,
    <Slide19Opportunity key={19} />,
    <Slide20Actions key={20} />,
    <Slide21Closing key={21} />,
  ];
}

export default function TalkLoader(): ReactNode {
  const slides = buildSlides();
  return (
    <SlideShell
      slides={slides}
      talkSlug="ia-procesos-productivos"
      totalSlides={TOTAL_SLIDES}
      subStepsMap={{ 2: 1, 5: 1, 10: 2 }}
    />
  );
}

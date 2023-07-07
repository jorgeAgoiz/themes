import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { headingPropDefs } from './heading.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type {
  PropsWithoutRefOrColor,
  MarginProps,
  GetPropDefTypes,
  NiceIntersection,
} from '../helpers';

type HeadingElement = React.ElementRef<'h1'>;
type HeadingOwnProps = GetPropDefTypes<typeof headingPropDefs>;
type CommonHeadingProps = NiceIntersection<MarginProps, HeadingOwnProps>;
type HeadingAsChildProps = { asChild?: boolean; as?: never } & PropsWithoutRefOrColor<'h1'>;
type HeadingAsProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  asChild?: never;
} & PropsWithoutRefOrColor<'h1'>;
type HeadingProps = CommonHeadingProps & (HeadingAsChildProps | HeadingAsProps);
const Heading = React.forwardRef<HeadingElement, HeadingProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    children,
    className,
    asChild = false,
    as: Tag = 'h1',
    size = headingPropDefs.size.default,
    align = headingPropDefs.align.default,
    trim = headingPropDefs.trim.default,
    color = headingPropDefs.color.default,
    highContrast = headingPropDefs.highContrast.default,
    ...headingProps
  } = marginRest;
  return (
    <Slot
      data-accent-scale={color}
      {...headingProps}
      ref={forwardedRef}
      className={classNames(
        'rui-Heading',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps),
        withBreakpoints(align, 'rui-ta'),
        withBreakpoints(trim, 'rui-lt'),
        { 'high-contrast': highContrast },
        className
      )}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  );
});
Heading.displayName = 'Heading';

export { Heading };

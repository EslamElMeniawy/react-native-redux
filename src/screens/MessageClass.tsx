import React from 'react';

import type {RootStackScreenProps} from '../types/navigation';

import ScreenContainer from '../components/ScreenContainer';
import MessageClass from '../components/message/MessageClass';

export default class MessageClassScreen extends React.PureComponent<
  RootStackScreenProps<'MessageClass'>
> {
  render() {
    const {route} = this.props;
    const {isDarkMode} = route.params;

    return (
      <ScreenContainer>
        <MessageClass isDarkMode={isDarkMode} />
      </ScreenContainer>
    );
  }
}

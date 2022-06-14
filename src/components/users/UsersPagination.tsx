import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {getUsers} from '../../store/api/usersApi';

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default (props: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {page, setPage} = props;
  const getUsersParams: Record<string, any> = {delay: 1, page};

  const {
    data: usersResponse,
    isLoading,
    isFetching,
  } = getUsers({params: getUsersParams});

  const textColorStyle = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Previous"
          onPress={() => setPage(prev => prev - 1)}
          disabled={page === 1 || isFetching || isLoading}
        />
      </View>

      {isFetching && (
        <ActivityIndicator size="small" style={styles.buttonContainer} />
      )}

      {!isFetching && (
        <Text style={[styles.pageText, textColorStyle]}>{`Page ${page}`}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={() => setPage(prev => prev + 1)}
          disabled={
            page === usersResponse?.total_pages || isFetching || isLoading
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  pageText: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
});

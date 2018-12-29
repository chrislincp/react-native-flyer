import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  NativeIndicator,
  WaveIndicator,
} from 'flyer';
import Page from '../../../components/Page';

export default class ActivityIndicatorPage extends Page {
  _headerProps() {
    return {
      title: '活动指示器',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      toast1Visible: false,
    };
  }

  _renderBase() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <BallIndicator color="white" animationDuration={800} />
          </View>

          <View style={{ flex: 1 }}>
            <PulseIndicator color="#007aff" />
          </View>

          <View style={{ flex: 1 }}>
            <SkypeIndicator color="white" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <WaveIndicator color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <WaveIndicator color="#007aff" waveMode="outline" />
          </View>

          <View style={{ flex: 1 }}>
            <WaveIndicator color="white" count={2} waveFactor={0.4} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <NativeIndicator color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <MaterialIndicator color="white" />
          </View>

          <View style={{ flex: 1 }}>
            <PacmanIndicator color="white" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <BarIndicator color="white" count={5} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <DotIndicator count={3} color="white" animationDuration={800} />
          </View>

          <View style={{ flex: 1 }}>
            <DotIndicator style={styles.reverse} count={3} color="white" animationDuration={800} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },

  reverse: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});

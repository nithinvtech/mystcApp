import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TopBarProps = {
  title: string;
  onBack?: () => void;
  rightText?: string;
  onRightPress?: () => void;
};

export default function TopBar({
  title,
  onBack,
  rightText,
  onRightPress,
}: TopBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {onBack && (
          <Pressable
            onPress={onBack}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={[styles.side, styles.rightSide]}>
        {rightText && (
          <Pressable
            onPress={onRightPress}
            disabled={!onRightPress}
            hitSlop={8}
            accessibilityRole="button"
          >
            <Text style={styles.rightText}>{rightText}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  side: {
    width: 72,
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  backButton: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    height: 44,
  },
  backIcon: {
    color: '#263238',
    fontSize: 34,
    lineHeight: 40,
  },
  title: {
    flex: 1,
    color: '#222',
    fontSize: 14,
    textAlign: 'center',
  },
  rightText: {
    color: '#F52B58',
    fontSize: 13,
  },
});

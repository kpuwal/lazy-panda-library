import React from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

const SIZE = 3
const MARGIN = 3
const BG = 'rgba(172, 172, 172)'
const ACTIVE_BG = 'white'
const dots = [1, 2, 3]
const INTERVAL = 500
const ANIMATION_DURATION = 800
const ANIMATION_SCALE = 2

export default class ThreeDotsLoader extends React.Component {
  state = {
    active: 1
  }

  componentDidMount(){
    this.interval = setInterval(() => {
      const active = this.state.active
      this.setState({ active: active > 2 ? 1 : active + 1})
    }, INTERVAL);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render() {
  const active = this.state.active
   return (
     <View style={styles.main}>
       {dots.map((i, idx) => <Dot key={idx} {...this.props} active={i === active}/>)}
     </View>
   )
  }
}

class Dot extends React.Component {
  static defaultProps = {
    size: SIZE,
    background: BG,
    activeBackground: ACTIVE_BG,
    dotMargin: MARGIN,
    animationDuration: ANIMATION_DURATION,
    animationScale: ANIMATION_SCALE,
  }

  constructor(props) {
    super(props)
    this.scale = new Animated.Value(1)
  }

  componentDidMount(){
    if (this.props.active) this.scaleUp()
  }

  componentDidUpdate(prevProps){
    if (prevProps.active && !this.props.active){
      this.scaleDown()
    }
    if (!prevProps.active && this.props.active){
      this.scaleUp()
    }
  }

  scaleDown = () => {
    Animated.timing(
      this.scale,
      {
        toValue: 1,
        duration: this.props.animationDuration,
        useNativeDriver: true
      }
    ).start()
  }

  scaleUp = () => {
    Animated.timing(
      this.scale,
      {
        toValue: this.props.animationScale,
        duration: this.props.animationDuration,
        useNativeDriver: true
      }
    ).start()
  }

  render(){
    const { active, size, background, activeBackground, dotMargin } = this.props
    const style = {
      height: size, 
      width: size,
      borderRadius: size / 2,
      marginHorizontal: dotMargin,
      backgroundColor: active ? activeBackground : background
    }
    return (
      <Animated.View style={[style, {transform: [{ scale: this.scale }]}]}/>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '-8%',
    paddingLeft: 2
  },
})
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'


const Toggle = props => {
  const {
    options,
    setValue,
    value,
  } = props

  return (
    <ToggleButtonGroup
      color="info"
      exclusive
      value={value}
    >
      {options.map(option => {
        const Icon = option.icon
        return (
          <ToggleButton
            key={option.value}
            onClick={() => setValue(option.value)}
            data-testid={`toggle-option-${option.value}`}
            style={{
              color: value === option.value ? null : '#e8d6ca',
              textTransform: 'none',
            }}
            value={option.value}
          >
            {option.label && option.label}
            {option.icon &&
              <Icon
                onClick={() => setValue(option.value)}
                value={option.value}
                style={{zIndex: 15}}
              />
            }
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

export default Toggle

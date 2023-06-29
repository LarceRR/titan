import { useTheme } from './hooks/useTheme';
export default function ThemeToggler(props) {
    const { theme, setTheme } = useTheme('light');
    const toggleTheme = () => {
        if (theme === 'light') {
        setTheme('dark')
        } else setTheme('light')
    }
    return (
        <div className='ThemeToggler' onClick={toggleTheme}>
            <span className={`theme ${theme === 'light' ? 'light' : 'dark'}`}></span>
        </div>
    )
}
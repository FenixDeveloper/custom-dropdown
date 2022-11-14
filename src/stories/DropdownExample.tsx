import {CommandEventHandler, Dropdown, Menu} from "../components";
import cs from "classnames";

interface FaIconProps {
  style?: string,
  icon: string,
  size?: string
}

function FaIcon({icon, size, style = 'fa-solid'}: FaIconProps): JSX.Element {
  return <span className={cs("icon", size)}>
      <i className={cs(style, icon)} />
    </span>
}

interface DropdownExampleProps {
  hover?: boolean
}

export function DropdownExample({hover = false}: DropdownExampleProps): JSX.Element {
  const command: CommandEventHandler = (event, item) => {
    console.log(`click on command: "${item.label}"`, event.target);
    alert(`click on command: "${item.label}"`);
  };
  return <Dropdown
    trigger={<FaIcon icon="fa-ellipsis-vertical fa-lg" size="is-large" />}
    hover={hover}
    options={{
      trigger: { replaceClassName: "button has-background-grey-light" },
      panel: { replaceClassName: "" }
    }}
  >
    {close => <Menu
      items={[
        { label: "Поделиться в социальных сетях", icon: <FaIcon icon="fa-share-nodes" />, command },
        { label: "Редактировать страницу", icon: <FaIcon icon="fa-pen-to-square" />, command },
        { label: "Удалить страницу", icon: <FaIcon icon="fa-trash" />, command }
      ]}
      className="menu-list panel has-background-white"
      onCommand={close}
    />}
  </Dropdown>;
}

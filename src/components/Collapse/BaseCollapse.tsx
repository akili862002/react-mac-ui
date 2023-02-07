import React from "react";

export interface IBaseCollapseProps extends React.PropsWithChildren {
  open: boolean;
  checkTimeout: number;
}

export class BaseCollapse extends React.Component<IBaseCollapseProps> {
  static propTypes = {};

  static defaultProps: Partial<IBaseCollapseProps> = {
    checkTimeout: 300,
  };

  timeout: NodeJS.Timeout = undefined;
  container: HTMLDivElement = undefined;
  content: HTMLDivElement = undefined;
  initialStyle: {
    height: string;
    overflow: "initial" | "hidden";
  };

  constructor(props: IBaseCollapseProps) {
    super(props);
    this.initialStyle = props.open
      ? { height: "auto", overflow: "initial" }
      : { height: "0px", overflow: "hidden" };
  }

  componentDidMount() {
    this.onResize();
  }

  shouldComponentUpdate(nextProps) {
    const { open: isOpened, children } = this.props;

    return children !== nextProps.children || isOpened !== nextProps.isOpened;
  }

  getSnapshotBeforeUpdate() {
    if (!this.container || !this.content) {
      return null;
    }
    if (this.container.style.height === "auto") {
      const { clientHeight: contentHeight } = this.content;
      this.container.style.height = `${contentHeight}px`;
    }
    return null;
  }

  componentDidUpdate() {
    this.onResize();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onResize = () => {
    clearTimeout(this.timeout);

    if (!this.container || !this.content) {
      return;
    }

    const { open: isOpened, checkTimeout } = this.props;
    const containerHeight = Math.floor(this.container.clientHeight);
    const contentHeight = Math.floor(this.content.clientHeight);

    const isFullyOpened =
      isOpened && Math.abs(contentHeight - containerHeight) <= 1;
    const isFullyClosed = !isOpened && Math.abs(containerHeight) <= 1;

    if (isFullyOpened || isFullyClosed) {
      this.onRest({
        isOpened,
        contentHeight,
      });
    } else {
      this.onWork({
        isOpened,
        contentHeight,
      });
      this.timeout = setTimeout(() => this.onResize(), checkTimeout);
    }
  };

  onRest = ({
    isOpened,
    contentHeight,
  }: {
    isOpened: boolean;
    contentHeight: number;
  }) => {
    if (!this.container || !this.content) {
      return;
    }

    const hasOpened =
      isOpened && this.container.style.height === `${contentHeight}px`;
    const hasClosed = !isOpened && this.container.style.height === "0px";

    if (hasOpened || hasClosed) {
      this.container.style.overflow = isOpened ? "initial" : "hidden";
      this.container.style.height = isOpened ? "auto" : "0px";
    }
  };

  onWork = ({ isOpened, contentHeight }) => {
    if (!this.container || !this.content) {
      return;
    }

    const isOpenining =
      isOpened && this.container.style.height === `${contentHeight}px`;
    const isClosing = !isOpened && this.container.style.height === "0px";

    if (isOpenining || isClosing) {
      // No need to do any work
      return;
    }

    this.container.style.overflow = "hidden";
    this.container.style.height = isOpened ? `${contentHeight}px` : "0px";
  };

  onRefContainer = (container) => {
    this.container = container;
  };

  onRefContent = (content) => {
    this.content = content;
  };

  render() {
    const { children, open: isOpened } = this.props;
    return (
      <div
        ref={this.onRefContainer}
        style={{
          ...this.initialStyle,
          transitionDuration: this.props.checkTimeout + "ms",
        }}
        aria-hidden={!isOpened}
      >
        <div ref={this.onRefContent}>{children}</div>
      </div>
    );
  }
}

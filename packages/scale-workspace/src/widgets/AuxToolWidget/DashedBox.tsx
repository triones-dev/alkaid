import React from "react";
import { useHover, usePrefix, useSelection, useToken } from "@alkaid/react";
import { useValidNodeOffsetRect } from "../../hooks";
import { observer } from "@formily/reactive-react";
import cls from "classnames";

export const DashedBox = observer(() => {
  const hover = useHover();
  const prefix = usePrefix("aux-dashed-box");
  const { hashId } = useToken();
  const selection = useSelection();
  const rect = useValidNodeOffsetRect(hover?.node);
  const createTipsStyle = () => {
    const baseStyle: React.CSSProperties = {
      top: 0,
      left: 0,
      pointerEvents: "none",
      boxSizing: "border-box",
      visibility: "hidden",
      zIndex: 2,
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
      baseStyle.visibility = "visible";
    }
    return baseStyle;
  };
  if (!hover.node) return null;
  if (hover.node.hidden) return null;
  if (selection.selected.includes(hover.node.id)) return null;
  return (
    <div className={cls(prefix, hashId)} style={createTipsStyle()}>
      <span
        className={cls(prefix + "-title", hashId)}
        style={{
          position: "absolute",
          bottom: "100%",
          left: 0,
          fontSize: 12,
          userSelect: "none",
          fontWeight: "lighter",
          whiteSpace: "nowrap",
        }}
      >
        {hover?.node.getMessage("title")}
      </span>
    </div>
  );
});

DashedBox.displayName = "DashedBox";
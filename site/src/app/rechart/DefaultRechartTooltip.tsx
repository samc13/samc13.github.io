import { Tooltip, TooltipProps } from "recharts";

const tooltipStyle = {
  backgroundColor: "#364156",
  border: "1px solid #333",
  color: "#ededed",
};

const DefaultRechartTooltip = (props: TooltipProps<string, string>) => {
  return (
    <Tooltip
      contentStyle={props.contentStyle ?? tooltipStyle}
      itemStyle={{ color: "#dbdbdb", ...props.itemStyle }}
      labelStyle={{ color: "#dbdbdb", ...props.labelStyle }}
      {...props}
    />
  );
};

export default DefaultRechartTooltip;
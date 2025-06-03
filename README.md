# tst

## MCP 配置修复

### 问题描述
原始的 MCP (Model Context Protocol) 配置文件不符合 Cursor 官方规范，导致配置错误。根据 [Cursor 官方 MCP 文档](https://docs.cursor.com/context/model-context-protocol)，SSE 传输类型的服务器配置需要遵循特定的格式。

### 原始配置问题
1. 使用了 `baseUrl` 字段而不是标准的 `url` 字段
2. 包含了不必要的字段如 `command`、`args`、`env`、`type`、`isActive`、`name`、`description` 等
3. 配置过于复杂，不符合 Cursor 的简化配置要求

### 解决方案
根据 Cursor 官方文档，对于 SSE 服务器，配置格式应该简化为只包含 `url` 字段。已创建了新的 `.cursor/mcp.json` 配置文件：

```json
{
  "mcpServers": {
    "@modelscope/@baranwang/mcp-trends-hub": {
      "url": "https://mcp.api-inference.modelscope.cn/sse/f2c68ae6d8af4d"
    },
    "@modelscope/@exa-labs/exa-mcp-server": {
      "url": "https://mcp.api-inference.modelscope.cn/sse/5bc97cd3e8194d"
    },
    "@modelscope/@upstash/context7-mcp": {
      "url": "https://mcp.api-inference.modelscope.cn/sse/b722a3d61ed14e"
    }
  }
}
```

### 主要改进
1. **简化配置结构**：移除了所有非必需字段，只保留 `url` 字段
2. **符合官方规范**：按照 [Cursor MCP 文档](https://docs.cursor.com/context/model-context-protocol) 的要求配置
3. **项目级配置**：使用 `.cursor/mcp.json` 实现项目特定的 MCP 服务器配置
4. **保持功能性**：保留了所有三个 ModelScope MCP 服务器的访问地址

### 技术参考
- [Cursor Model Context Protocol 官方文档](https://docs.cursor.com/context/model-context-protocol)
- SSE 传输类型配置要求
- 项目级 vs 全局级 MCP 配置选项


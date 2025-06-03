# tst

## MCP �����޸�

### ��������
ԭʼ�� MCP (Model Context Protocol) �����ļ������� Cursor �ٷ��淶���������ô��󡣸��� [Cursor �ٷ� MCP �ĵ�](https://docs.cursor.com/context/model-context-protocol)��SSE �������͵ķ�����������Ҫ��ѭ�ض��ĸ�ʽ��

### ԭʼ��������
1. ʹ���� `baseUrl` �ֶζ����Ǳ�׼�� `url` �ֶ�
2. �����˲���Ҫ���ֶ��� `command`��`args`��`env`��`type`��`isActive`��`name`��`description` ��
3. ���ù��ڸ��ӣ������� Cursor �ļ�����Ҫ��

### �������
���� Cursor �ٷ��ĵ������� SSE �����������ø�ʽӦ�ü�Ϊֻ���� `url` �ֶΡ��Ѵ������µ� `.cursor/mcp.json` �����ļ���

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

### ��Ҫ�Ľ�
1. **�����ýṹ**���Ƴ������зǱ����ֶΣ�ֻ���� `url` �ֶ�
2. **���Ϲٷ��淶**������ [Cursor MCP �ĵ�](https://docs.cursor.com/context/model-context-protocol) ��Ҫ������
3. **��Ŀ������**��ʹ�� `.cursor/mcp.json` ʵ����Ŀ�ض��� MCP ����������
4. **���ֹ�����**���������������� ModelScope MCP �������ķ��ʵ�ַ

### �����ο�
- [Cursor Model Context Protocol �ٷ��ĵ�](https://docs.cursor.com/context/model-context-protocol)
- SSE ������������Ҫ��
- ��Ŀ�� vs ȫ�ּ� MCP ����ѡ��


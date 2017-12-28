1)Syntax
dev
[host]/api/table_name?cm=?&dt={}
partner
[host]/api/table_name?cm=?&dt={"company":{"company_id":30743},....}
Ex : http://dev.wahsis.net/api/vendors?cm=list&dt={}
...
detail:{“id”:?} 
list:{}
3)Add
[host]/api/table_name?cm=add&dt={table_name:{ column list }}
[host]/api/table_name?cm=add&dt={"company":{"company_id":30743},"lms_leave_type":{"leave_type_id":"P",........}}
Note type
column type : varchar,nvarchar,ntext,datetime  syntax "column":"value"
column type : number  syntax "column":value
column type : bit syntax "column":true or "column":false
4)Update
[host]/api/table_name?cm=update&dt={table_name:{ column list }}
...
[host]/api/table_name?cm=search&dt={table_name:{ column list },page:{page_size:10,page_index:1},"languages":"language_id":"vi"}

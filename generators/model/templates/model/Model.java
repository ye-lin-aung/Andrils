package  <%= pack_name %>.model;



/**
 * Created by user on 8/21/16.
 */


public class <%= className %> 
{
	<% for(var i=0;i< vars.length;i++){ %>
	private <%- vars[i] %> <%= var_names[i] %>;
	<% } %>
	<% for(var i=0;i< vars.length;i++){ %>
	public void set<%= var_names[i].replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}) %>(<%- vars[i] %> <%=var_names[i]%>){
		this.<%=var_names[i]%> = <%=var_names[i]%>;
	}
	public <%- vars[i] %> get<%= var_names[i].replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}) %>(){
		return this.<%=var_names[i]%>;
	}
	<% } %>

	@Override public String toString() {
    StringBuilder stringBuilder = new StringBuilder();
    stringBuilder.append("***** <%= className %> Model Details *****\n");
    <% for(var i=0;i< vars.length;i++){ %>stringBuilder.append("<%= var_names[i]%>="+this.get<%= var_names[i].replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}) %>() + "\n"); 
    <% } %>
    stringBuilder.append("*******************************");
    return stringBuilder.toString();
  }

}

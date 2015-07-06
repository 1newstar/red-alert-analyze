/**   
* @Title: SshMySQLStatInvokeScheduleJob.java 
* @Package com.tyyd.ywpt.biz.quartzschedule.impl.invoke.mysql 
* @Description:  
* @author wangyu   
* @date 2014-7-7 下午4:19:12 
* @CopyRight 天翼阅读
* @version V1.0   
*/
package com.tyyd.ywpt.biz.quartzschedule.impl.invoke.mysql;

import org.quartz.DisallowConcurrentExecution;

import com.tyyd.ywpt.biz.bean.dataobject.DynamicBeanBO;
import com.tyyd.ywpt.biz.quartzschedule.dataobject.QuartzScheduleJobBO;
import com.tyyd.ywpt.biz.quartzschedule.impl.AbstractQuotaScheduleQuartzTask;
import com.tyyd.ywpt.dao.configration.db.dataobject.DbConfigDomain;

/**
 * @author wangyu
 *
 */
@DisallowConcurrentExecution
public class SshMySQLStatInvokeScheduleJob extends AbstractQuotaScheduleQuartzTask{

	@SuppressWarnings("rawtypes")
	@Override
	public void doTask(QuartzScheduleJobBO scheduleJob) {
		DynamicBeanBO beanDomain = getCustomerBeanListFactory().getBeanProperty(scheduleJob.getBeanId());
		Object obj = beanDomain.getPropertyBean();
		DbConfigDomain dbDomain = null;
		if(obj instanceof DbConfigDomain){
			dbDomain = (DbConfigDomain)obj;
		}
		getMySQLSsh().sshCollectMySQLStat(dbDomain.getDbId());
		
	}

}
